require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def test_create_invalid_user
    assert_difference 'User.all.count', 0 do
      post ('/users.json'), params: {}
    end
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal false, data['status']
    assert_equal 12, data['errors'].count
    assert data['errors'].include?("Name can't be blank")
    assert_equal nil, data['current_user']
  end

  def test_create_new_user
    assert_difference 'User.all.count', 1 do
      post ('/users.json'), params: valid_user
    end
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal nil, data['errors']
    assert_equal valid_user[:name], data['current_user']['name']
    assert_equal valid_user[:surname], data['current_user']['surname']
    assert_equal User.last.id, data['current_user']['id']
    assert_equal [], data['profile']['posts']
    assert_equal [], data['profile']['comments']
    assert_equal [], data['profile']['friends']
    assert_equal data['current_user'], data['profile']['user'].slice('name', 'surname', 'id')
    assert_equal false, data['profile']['is_friend']
    assert_equal 0, data['profile']['statistics']['posts']
    assert_equal ('/be'+Image.last.image.avatar.url), data['profile']['avatar']
  end

  def test_show_user
    two_new_user
    log_in_as @user
    get ('/users/'+@friend.id.to_s+'.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal @friend.id, data['data']['user']['id']
    assert_equal false, data['data']['is_friend']
  end

  def test_start
    two_new_user
    get ('/start.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal false, data['status']
    assert_equal nil, data['current_user']

    log_in_as @user
    get ('/start.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal @user.id, data['current_user']['id']
  end

  def test_rating
    two_new_user
    log_in_as @user
    new_post = @user.posts.create(text: 'Something')
    comment = new_post.comments.create(text: 'Something else', user_id: @user.id)

    assert_difference 'Rating.all.count', 1 do
      post ('/rating.json'), params: {:like => true, :post_id => new_post.id}
    end
    assert_response :success
    assert_equal 1, new_post.ratings.last.like
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal ({'like'=>1, 'dislike'=>0}), data['rating']

    assert_difference 'Rating.all.count', 1 do
      post ('/rating.json'), params: {:dislike => true, :comment_id => comment.id}
    end
    assert_response :success
    assert_equal 1, comment.ratings.last.dislike
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal ({'like'=>0, 'dislike'=>1}), data['rating']

    assert_difference 'Rating.all.count', 0 do
      post ('/rating.json'), params: {:like => true, :post_id => new_post.id}
    end
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal false, data['status']
    assert_equal ({'like'=>1, 'dislike'=>0}), data['rating']
  end

  def test_update_users_name
    two_new_user
    log_in_as @user
    patch ('/users/'+@user.id.to_s+'.json'), params: {:name => '',
                                                      :surname => @user.surname}
    assert_response :success
    data = JSON.parse(response.body)
    assert_not_equal '', @user.name
    assert_equal @user.slice(:name, :surname), data.slice('name', 'surname')

    patch ('/users/'+@user.id.to_s+'.json'), params: {:name => 'Newname',
                                                      :surname => @user.surname}
    assert_response :success
    data = JSON.parse(response.body)
    assert_not_equal 'Newname', @user.name
    assert_not_equal @user.slice(:name, :surname), data.slice('name', 'surname')
    assert_equal ({'name'=>'Newname',
                   'surname'=>@user.surname}), data.slice('name', 'surname')

    patch ('/users/'+@friend.id.to_s+'.json'), params: {:name => 'Newname',
                                                        :surname => @friend.surname}
    assert_not_equal 'Newname', User.find_by(id: @friend.id).name
  end

  def test_edit_password
    two_new_user
    log_in_as @user
    post ('/edit_pass.json'), params: {:old_password => 'wrong',
                                       :password => 'newPass1',
                                       :password_confirmation => 'newPass1'}
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal @user.slice(:name, :surname), data.slice('name', 'surname')
    assert_not User.find_by(id: @user.id).authenticated?(:password, 'newPass1')

    post ('/edit_pass.json'), params: {:old_password => 'True0pass',
                                       :password => 'invalid_pass',
                                       :password_confirmation => 'invalid_pass'}
    assert_response :success
    assert_not User.find_by(id: @user.id).authenticated?(:password, 'invalid_pass')

    post ('/edit_pass.json'), params: {:old_password => 'True0pass',
                                       :password => 'newPass1',
                                       :password_confirmation => 'newPass1'}
    assert_response :success
    assert User.find_by(id: @user.id).authenticated?(:password, 'newPass1')
  end

  def test_get_edit
    two_new_user
    log_in_as @user
    get ('/users/'+@user.id.to_s+'/edit.json')
    assert_response :success
    current_user = JSON.parse(response.body)['current_user']
    assert_equal @user.slice(:name, :surname, :id), current_user.slice('name', 'surname', 'id')
  end

  def test_search
    two_new_user
    log_in_as @user
    post ('/search.json'), params: {:line => search_line[:blank]}
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 2, data['friends'].count
    assert ((data['friends'][0]['user']['id']==@friend.id &&
             data['friends'][1]['user']['id']==@user.id) ||
            (data['friends'][1]['user']['id']==@friend.id &&
             data['friends'][0]['user']['id']==@user.id))

    post ('/search.json'), params: {:line => search_line[:part_name]}
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['friends'].count
    assert_equal @friend.id, data['friends'][0]['user']['id']

    post ('/search.json'), params: {:line => search_line[:include_name]}
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['friends'].count
    assert_equal @friend.id, data['friends'][0]['user']['id']

    post ('/search.json'), params: {:line => search_line[:no_record]}
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal [], data['friends']
  end

  def test_get_friends
    two_new_user
    log_in_as @user
    get ('/users/'+@user.id.to_s+'/friends.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal [], data['friends']

    FriendRelation.create(user_id: @user.id, friend_id: @friend.id, confirmed: true)
    get ('/users/'+@user.id.to_s+'/friends.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['friends'].count
    assert_equal @friend.slice(:name, :surname, :id),
                 data['friends'][0]['user'].slice('name', 'surname', 'id')
  end

  def test_get_followers
    two_new_user
    log_in_as @user
    get ('/users/'+@user.id.to_s+'/followers.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal [], data['friends']

    FriendRelation.create(user_id: @friend.id, friend_id: @user.id)
    get ('/users/'+@user.id.to_s+'/followers.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['friends'].count
    assert_equal @friend.slice(:name, :surname, :id),
                 data['friends'][0]['user'].slice('name', 'surname', 'id')
    get ('/users/'+@user.id.to_s+'/friends.json')
    assert_equal [], JSON.parse(response.body)['friends']

    some_user = User.create(valid_user)
    FriendRelation.create(user_id: @user.id, friend_id: some_user.id)
    get ('/users/'+@user.id.to_s+'/followers.json')
    data = JSON.parse(response.body)
    assert_equal 1, data['friends'].count
    assert_not_equal some_user.id, data['friends'][0]['user']['id']
  end

  def test_create_friend
    two_new_user
    log_in_as @user
    post ('/add_friend.json'), params: {:id => @friend.id}
    assert_response :success
    assert_equal true, JSON.parse(response.body)['is_friend']
    assert_not FriendRelation.last.confirmed
    get ('/users/'+@user.id.to_s+'/followers.json')
    assert_equal [], JSON.parse(response.body)['friends']
    get ('/users/'+@user.id.to_s+'/friends.json')
    assert_equal [], JSON.parse(response.body)['friends']

    delete ('/logout.json')
    log_in_as @friend
    post ('/add_friend.json'), params: {:id => @user.id}
    assert_response :success
    assert_equal true, JSON.parse(response.body)['is_friend']
    assert_equal 2, FriendRelation.all.count
    assert FriendRelation.last.confirmed
    assert FriendRelation.first.confirmed
    get ('/users/'+@friend.id.to_s+'/followers.json')
    assert_equal [], JSON.parse(response.body)['friends']
    get ('/users/'+@friend.id.to_s+'/friends.json')
    assert_equal @user.id, JSON.parse(response.body)['friends'][0]['user']['id']
  end

  def test_destroy_friend
    two_new_user
    log_in_as @user
    FriendRelation.create(user_id: @user.id, friend_id: @friend.id)
    assert_difference 'FriendRelation.all.count', -1 do
      delete ('/delete_friend.json'), params: {:id => @friend.id}
    end
    assert_response :success
    assert_not JSON.parse(response.body)['is_friend']

    FriendRelation.create(user_id: @user.id, friend_id: @friend.id, confirmed: true)
    FriendRelation.create(user_id: @friend.id, friend_id: @user.id, confirmed: true)
    assert_difference 'FriendRelation.all.count', -1 do
      delete ('/delete_friend.json'), params: {:id => @friend.id}
    end
    assert_not FriendRelation.all[0].confirmed
    assert_equal ({'user_id' => @friend.id, 'friend_id' => @user.id}),
                  FriendRelation.all[0].slice(:user_id, :friend_id)
  end

  private
    def search_line
      {:blank => '',
       :part_name => @friend.name.first(3),
       :include_name => ("some text "+@friend.name+"wrap"),
       :no_record => 'about nothing'}
    end
end

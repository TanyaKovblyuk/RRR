require 'test_helper'

class UsersHelperTest < ActionDispatch::IntegrationTest
  include UserTestHelper
  include UsersHelper
  include SessionsHelper

  def setup
    two_new_user
    @other = User.create(valid_user)
    @avatar = Image.create(image: valid_image[:image], user_id: @user.id, avatar: true)
    Image.create(image: valid_image[:image], user_id: @user.id)
    Post.create(user_id: @friend.id, text: 'News text about nothing')
    Post.create(user_id: @user.id, text: 'Something about nothing')
    Comment.create(user_id: @user.id, post_id: Post.last.id, text: 'Something very important')
    Comment.create(user_id: @friend.id, post_id: Post.last.id, text: 'Something very important too')
    FriendRelation.create(user_id: @user.id, friend_id: @friend.id, confirmed: true)
    FriendRelation.create(user_id: @friend.id, friend_id: @user.id, confirmed: true)
    FriendRelation.create(user_id: @other.id, friend_id: @user.id)
    log_in_as @user
  end

  def test_get_avatar
    url = "/be/uploads/image/image/"+@avatar.id.to_s+"/avatar_some.jpg"
    assert_equal url, get_avatar(@user)
  end

  def test_get_all_avatar
    url = "/be/uploads/image/image/"+@avatar.id.to_s+"/avatar_some.jpg"
    assert_equal [url], get_all_avatar(@user)
  end

  def test_search_rating
    assert_equal ({like: 0, dislike: 0}), search_rating(@user.posts.last)
    assert_equal ({like: 0, dislike: 0}), search_rating(@user.comments.last)
  end

  def test_post_images
    assert_equal [], post_images(Post.last)
  end

  def test_response_posts
    hash = {post: Post.last,
            rating: {like: 0, dislike: 0},
            utube: nil,
            img: [] }
    assert_equal [hash], response_posts(@user)
  end

  def test_build_comments
    hash_user = {user: @user.slice(:name, :surname, :id),
                 comment: @user.comments.all[0],
                 rating: {like: 0, dislike: 0},
                 avatar: "/be/uploads/image/image/"+@avatar.id.to_s+"/avatar_some.jpg"}
    hash_friend = {user: @friend.slice(:name, :surname, :id),
                 comment: @friend.comments.all[0],
                 rating: {like: 0, dislike: 0},
                 avatar: nil}
    assert_equal 2, build_comments(Post.last.comments).count
    assert_equal hash_user, build_comments(Post.last.comments)[0]
    assert_equal hash_friend, build_comments(Post.last.comments)[1]
  end

  def test_response_comment
    hash_user = {user: @user.slice(:name, :surname, :id),
                 comment: @user.comments.all[0],
                 rating: {like: 0, dislike: 0},
                 avatar: "/be/uploads/image/image/"+@avatar.id.to_s+"/avatar_some.jpg"}
    assert_equal 1, response_comment(@user).count
    assert_equal 2, response_comment(@user)[0].count
    assert_equal hash_user, response_comment(@user)[0][0]
  end

  def test_get_nine_friends
    hash_data = {user: @friend.slice(:name, :surname, :id),
                 avatar: nil}
    assert_equal 1, get_nine_friends(@user).count
    assert_equal hash_data, get_nine_friends(@user)[0]
  end

  def test_get_eight_images
    url = "/be/uploads/image/image/"+@avatar.id.to_s+"/preview_some.jpg"
    assert_equal 2, get_eight_images(@user).count
    assert_equal url, get_eight_images(@user)[0]
  end

  def test_confirmed_friends
    assert_equal 1, confirmed_friends(@user).all.count
    assert_equal @friend, confirmed_friends(@user)[0]
  end

  def test_get_followers
    assert_equal 1, get_followers(@user).all.count
    assert_equal @other, get_followers(@user)[0]
  end

  def test_is_friend
    assert is_friend?(@friend)
    assert_not is_friend?(@other)
    assert_not is_friend?(@user)
  end

  def test_news
    assert_equal 1, news(0).count
    assert_equal @friend.posts.last, news(0)[0][:post]
  end

  def test_data
    assert_equal ({:posts => 1, :images => 2, :comments => 1, :friends => 1}),
                 data(@user)[:statistics]
  end
end

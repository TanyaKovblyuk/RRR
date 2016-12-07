require "base64"
require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
    post '/login.json', params:  {:email => @user.email,
                                  :password => valid_user[:password],
                                  :remember_me => '1'}
  end

  def test_create_new_post
    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:id => @user.id,
                                                           :text => 'something',
                                                           :image => ''}
    assert_response :success
    assert_equal 1, Post.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['posts'].count
    post = data['posts'][0]['post']
    assert_equal Post.last.id, post['id']
    assert_equal @user.id, post['user_id']
    assert_equal 'something', post['text']
    assert_equal [], data['posts'][0]['img']
    assert_equal nil, data['posts'][0]['utube']
    assert_equal ({"like"=>0, "dislike"=>0}), data['posts'][0]['rating']
    assert_equal [[]], data['comments']
  end

  def test_create_new_post_with_url
    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:id => @user.id,
                                                           :text => 'https://exemple.com',
                                                           :image => ''}
    assert_response :success
    assert_equal 0, Post.all.count
    data = JSON.parse(response.body)
    assert_equal false, data['status']
    assert_equal nil, data['posts']

    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:id => @user.id,
                                                           :text => 'https://youtube.com/embed/something',
                                                           :image => ''}
    assert_response :success
    assert_equal 1, Post.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['posts'].count
    assert_equal 'https://youtube.com/embed/something', data['posts'][0]['post']['text']
    assert_equal 'https://youtube.com/embed/something', data['posts'][0]['utube']
    assert_equal ({"like"=>0, "dislike"=>0}), data['posts'][0]['rating']
    assert_equal [[]], data['comments']
  end

  def test_create_new_post_with_image
    base_64 = "data:image/jpg;base64,"+Base64.encode64(open("#{Rails.root}/test/fixtures/files/some.jpg").read)
    images = [base_64]

    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:user_id => @user.id,
                                                           :text => 'something',
                                                           :image => images}
    assert_response :success
    assert_equal 1, Post.all.count
    assert_equal 1, Image.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 'something', data['posts'][0]['post']['text']
    url = "/be/uploads/image/image/"+Image.last.id.to_s+"/post_file.jpg"
    assert_equal [url], data['posts'][0]['img']
  end

  def test_create_new_post_with_image_without_text
    base_64 = "data:image/jpg;base64,"+Base64.encode64(open("#{Rails.root}/test/fixtures/files/some.jpg").read)
    images = [base_64]

    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:user_id => @user.id,
                                                           :text => '',
                                                           :image => images}
    assert_response :success
    assert_equal 1, Post.all.count
    assert_equal 1, Image.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal '', data['posts'][0]['post']['text']
    url = "/be/uploads/image/image/"+Image.last.id.to_s+"/post_file.jpg"
    assert_equal [url], data['posts'][0]['img']
  end

  def test_create_new_post_with_images
    base_64 = "data:image/jpg;base64,"+Base64.encode64(open("#{Rails.root}/test/fixtures/files/some.jpg").read)
    images = [base_64, base_64, base_64]

    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:user_id => @user.id,
                                                           :text => '',
                                                           :image => images}
    assert_response :success
    assert_equal 1, Post.all.count
    assert_equal 3, Image.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal '', data['posts'][0]['post']['text']
    url1 = "/be/uploads/image/image/"+Image.last.id.to_s+"/post_file.jpg"
    url2 = "/be/uploads/image/image/"+(Image.last.id-1).to_s+"/post_file.jpg"
    url3 = "/be/uploads/image/image/"+(Image.last.id-2).to_s+"/post_file.jpg"
    assert_equal [url3, url2, url1], data['posts'][0]['img']
  end

  def test_delete_post
    base_64 = "data:image/jpg;base64,"+Base64.encode64(open("#{Rails.root}/test/fixtures/files/some.jpg").read)
    images = [base_64]

    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:user_id => @user.id,
                                                           :text => 'something',
                                                           :image => images}
    post ('/users/'+@user.id.to_s+'/posts.json'), params: {:user_id => @user.id,
                                                           :text => '',
                                                           :image => images}
    assert_response :success
    assert_equal 2, Post.all.count
    assert_equal 2, Image.all.count

    delete ('/users/'+@user.id.to_s+'/posts/'+Post.last.id.to_s+'.json')
    assert_response :success
    assert_equal 1, Post.all.count
    assert_equal 2, Image.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 'something', data['posts'][0]['post']['text']
    url = "/be/uploads/image/image/"+(Image.last.id-1).to_s+"/post_file.jpg"
    assert_equal [url], data['posts'][0]['img']
  end

  def test_show_news
    get ('/users/'+@user.id.to_s+'/posts.json')
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal [], data['posts']
  end
end

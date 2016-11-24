require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    log_in_new_user
  end

  def test_get_profile_pages
    get user_path(@user)
    assert_response :redirect
    assert_routing '/users/:user_id/posts/:id', controller: "posts", action: "show",
                                                user_id: ":user_id", id: ":id"
  end

  def test_new_pos
    post user_posts_path(@user.id), params:  { :id => @user.id,
                                               :post => {:text => 'something' } }
    assert_response :redirect
    assert_routing user_posts_path, controller: 'posts', action: 'index', user_id: @user.id.to_s
  end

  def test_post_with_wrong_data
    post user_posts_path(@user), params:  { :id => @user.id, :post => {:text => '' } }
    assert_response :redirect
  end

  def test_delete_post
    post = @user.posts.create(text: "something")
    assert_equal 1, Post.all.count
    delete user_post_path(@user, post)
    assert_response :redirect
  end
end

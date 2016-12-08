require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    two_new_user
    log_in_as @user
    @post = @user.posts.create(text: 'Very long text about nothing')
  end

  def test_create_new_comment
    post ('/users/'+@user.id.to_s+'/comments.json'), params: {:post_id => @post.id,
                                                              :text => 'Something else'}
    assert_equal 1, Comment.all.count
    assert_equal 1, @post.comments.all.count
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['comments'].count
    comment = data['comments'][0][0]['comment']
    assert_equal Comment.last.id, comment['id']
    assert_equal @user.id, comment['user_id']
    assert_equal @post.id, comment['post_id']
    assert_equal 'Something else', comment['text']
    assert_equal ({"like"=>0, "dislike"=>0}), data['comments'][0][0]['rating']
    assert_equal @user.slice(:name, :surname, :id), data['comments'][0][0]['user']
  end

  def test_delete_comment
    @post.comments.create(user_id: @user.id, text: 'Something')
    assert_difference 'Comment.all.count', -1 do
      delete ('/users/'+@user.id.to_s+'/comments/'+Comment.last.id.to_s+'.json')
    end
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal [[]], data['comments']
  end
end

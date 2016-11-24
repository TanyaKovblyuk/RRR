require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
  end

  def test_user_should_be_presence
    assert Comment.new(text: "some text", user_id: 10).invalid?
    assert Comment.new(text: "some text", user_id: @user.id).valid?
  end

  def test_text_or_image_should_by_presence
    assert Comment.new(text: "some text", user_id: @user.id).valid?
    assert Comment.new(user_id: @user.id).invalid?
    comment = Comment.new(user_id: @user.id)
    comment.images.new(valid_image)
    assert comment.valid?
  end

  def test_destroy_relations
    @user.comments.create(text: "some text")
    assert_difference ['User.all.count', 'Comment.all.count'], -1 do
      @user.destroy
    end
  end

  def test_destroy_relations_comment
    @user.posts.create(text: "some text")
    comment = @user.posts.last.comments.create(text: "some text")
    assert_difference ['User.all.count', 'Post.all.count'], 0 do
      comment.destroy
    end
    assert_equal 0, Comment.all.count
  end
end

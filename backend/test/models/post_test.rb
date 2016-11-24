require 'test_helper'

class PostTest < ActiveSupport::TestCase
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
  end

  def test_user_should_be_presence
    assert Post.new(text: "some text", user_id: 10).invalid?
    assert Post.new(text: "some text", user_id: @user.id).valid?
  end

  def test_text_or_image_should_by_presence
    assert Post.new(text: "some text", user_id: @user.id).valid?
    assert Post.new(user_id: @user.id).invalid?
    post = Post.new(user_id: @user.id)
    post.images.new( valid_image )
    assert post.valid?
  end

  def test_destroy_relations
    post = @user.posts.create(text: "some text")
    post.images.create( valid_image )
    assert_difference ['User.all.count', 'Post.all.count', 'Image.all.count'], -1 do
      @user.destroy
    end
  end

  def test_nullify_relations
    post = @user.posts.create(text: "some text")
    image = post.images.create( valid_image )
    assert_difference ['User.all.count', 'Image.all.count'], 0 do
      post.destroy
    end
    assert_equal 0, Post.all.count
    assert Image.last.post_id.nil?
  end
end

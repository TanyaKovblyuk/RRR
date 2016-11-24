require 'test_helper'

class RatingTest < ActiveSupport::TestCase
  include UserTestHelper

  def setup
    two_new_user
    @post = @user.posts.create(text: "something")
  end

  def test_new_reting
    assert @post.ratings.new(like: 1, user_id: @user.id, estimator_id: @friend.id).valid?
    assert @post.ratings.new(like: 1).invalid?
    assert @post.ratings.new(like: 1, estimator_id: @friend.id).invalid?
  end

  def test_second_reting
    @post.ratings.create(like: 1, user_id: @user.id, estimator_id: @friend.id)
    assert_equal 1, @post.ratings.all.count
    assert_raises(Exception) do
      @post.ratings.create(dislike: 1, user_id: @user.id, estimator_id: @friend.id).valid?
    end
    assert_equal 1, @post.ratings.all.count
  end

  def test_delete_estimator
    @post.ratings.create(like: 1, user_id: @user.id, estimator_id: @friend.id)
    assert_difference '@post.ratings.all.count', -1 do
      @friend.destroy
    end
  end

  def test_delete_user
    @post.ratings.create(like: 1, user_id: @user.id, estimator_id: @friend.id)
    @user.destroy
    assert_equal 0, Rating.all.count
  end
end

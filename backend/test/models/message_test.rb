require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  include UserTestHelper
  
  def setup
    two_new_user
  end

  def test_new_friend_relation
    assert Message.new(text: "something", user_id: 99, receiver_id: 100).invalid?
    assert Message.new(text: "something", user_id: 99, receiver_id: @friend.id).invalid?
    assert @user.messages.new(text: "something", receiver_id: 100).invalid?
    assert @user.messages.new(receiver_id: @friend.id).invalid?
    assert @user.messages.new(text: "something", receiver_id: @friend.id).valid?
  end

  def test_create_friend_relation
    @user.messages.create(text: "something", receiver_id: @friend.id)
    assert_equal 1, @user.messages.count
    assert_equal 1, @friend.inverse_messages.count
  end

  def test_delete_user
    @user.messages.create(text: "something", receiver_id: @friend.id)
    @user.destroy
    assert_equal 1, @friend.inverse_messages.count
  end

  def test_delete_friend
    @user.messages.create(text: "something", receiver_id: @friend.id)
    @friend.destroy
    assert_equal 1, @user.messages.count
  end
end

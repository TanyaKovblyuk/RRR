require 'test_helper'

class FriendRelationTest < ActiveSupport::TestCase
  include UserTestHelper
  
  def setup
    two_new_user
  end

  def test_new_friend_relation
    assert FriendRelation.new(user_id: 99, friend_id: 100).invalid?
    assert FriendRelation.new(user_id: 99, friend_id: @friend.id).invalid?
    assert @user.friend_relations.new(friend_id: 100).invalid?
    assert @user.friend_relations.new(friend_id: @friend.id).valid?
  end

  def test_create_friend_relation
    @user.friend_relations.create(friend_id: @friend.id)
    assert_equal 1, @user.all_relations.count
    assert_equal 1, @user.all_friends.count
    assert_equal 1, @friend.all_relations.count
    assert_equal 1, @friend.all_friends.count
  end

  def test_delete_user
    @user.friend_relations.create(friend_id: @friend.id)
    @user.destroy
    assert_equal 0, @friend.all_relations.count
    assert_equal 0, @friend.all_friends.count
  end

  def test_delete_friend
    @user.friend_relations.create(friend_id: @friend.id)
    @friend.destroy
    assert_equal 0, @user.all_relations.count
    assert_equal 0, @user.all_friends.count
  end

  def test_delete_relation
    @user.friend_relations.create(friend_id: @friend.id)
    @user.all_relations.all[0].destroy
    assert_equal 0, @user.all_relations.count
    assert_equal 0, @user.all_friends.count
    assert_equal 0, @friend.all_relations.count
    assert_equal 0, @friend.all_friends.count
  end
end

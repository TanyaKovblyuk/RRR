require 'test_helper'

class SessionsHelperTest < ActionDispatch::IntegrationTest
  include UserTestHelper
  include SessionsHelper

  def setup
    two_new_user
    log_in_as @user
  end

  def test_log_out
    assert_not_equal nil, User.find_by(id: @user.id).remember_digest
    log_out
    assert_equal nil, @user.remember_digest
  end

  def test_log_in
    log_out
    log_in @user
    assert_equal 'online', User.find_by(id: @user.id).presence
  end

  def test_current_user
    assert_equal @user, current_user
  end

  def test_logged
    assert logged?
  end
end

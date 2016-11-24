require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
  end

  def test_get_root_pages
    get root_path
    assert_response :success
    assert_routing '/', controller: 'users', action: 'new'
  end

  def test_log_in_with_remember_me
    post login_path(@user.id), params:  { session: {:email => @user.email,
                                                    :password => valid_user[:password],
                                                    :remember_me => '1'} }
    assert_response :redirect
    assert_not_nil response.cookies['user_id']
    assert_not_nil response.cookies['remember_token']
    assert User.all[0].authenticated?(:remember, response.cookies['remember_token'])
    assert_routing user_url(@user), controller: 'users', action: 'show', id: @user.id.to_s
  end

  def test_log_in_without_remember_me
    post login_path(@user.id), params:  { session: {:email => @user.email,
                                                    :password => valid_user[:password],
                                                    :remember_me => '0'} }
    assert_response :redirect
    assert_nil response.cookies['user_id']
    assert_nil response.cookies['remember_token']
    assert_routing user_url(@user), controller: 'users', action: 'show', id: @user.id.to_s
  end

  def test_log_out
    post login_path(@user.id), params:  { session: {:email => @user.email,
                                                    :password => valid_user[:password],
                                                    :remember_me => '1'} }
    delete logout_path(@user)
    assert_nil response.cookies['user_id']
    assert_nil response.cookies['remember_token']
    assert_response :redirect
    assert_routing '/', controller: 'users', action: 'new'
  end

  def test_log_in_with_wrong_data
    post login_path(@user.id), params:  { session: {:email => @user.email,
                                                    :password => "something",
                                                    :remember_me => '1'} }
    assert_response :success
    assert_routing '/', controller: 'users', action: 'new'
    assert_nil response.cookies['user_id']
    assert_nil response.cookies['remember_token']
  end
end

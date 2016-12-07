require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
  end

  def test_log_in_with_remember_me
    post :create, :format => "json", params:  {:email => @user.email,
                                               :password => valid_user[:password],
                                               :remember_me => '1'}
    assert_response :success
    assert_not_nil response.cookies['user_id']
    assert_not_nil response.cookies['remember_token']
    assert User.all[0].authenticated?(:remember, response.cookies['remember_token'])
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal ({'name' => @user.name,
                   'surname' => @user.surname,
                   'id' => @user.id}), data['current_user']
    assert_equal ({'name' => @user.name,
                   'surname' => @user.surname,
                   'id' => @user.id,
                   'presence'=>nil}), data['profile']['user']
  end

  def test_log_in_without_remember_me
    post :create, :format => "json", params:  {:email => @user.email,
                                               :password => valid_user[:password],
                                               :remember_me => '0'}
    assert_response :success
    assert_nil response.cookies['user_id']
    assert_nil response.cookies['remember_token']
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal ({'name' => @user.name,
                   'surname' => @user.surname,
                   'id' => @user.id}), data['current_user']
    assert_equal ({'name' => @user.name,
                   'surname' => @user.surname,
                   'id' => @user.id,
                   'presence'=>nil}), data['profile']['user']
  end

  def test_log_in_with_wrong_data
    post :create, :format => "json", params:  {:email => @user.email,
                                               :password => 'wrong_password',
                                               :remember_me => '1'}
    assert_response :success
    assert_routing '/', controller: 'users', action: 'new'
    assert_nil response.cookies['user_id']
    assert_nil response.cookies['remember_token']
    data = JSON.parse(response.body)
    assert_equal false, data['status']
    assert_equal nil, data['current_user']
  end

  def test_log_out
    post :create, :format => "json", params:  {:email => @user.email,
                                               :password => 'wrong_password',
                                               :remember_me => '1'}
    delete :destroy, :format => "json"
    assert_nil response.cookies['user_id']
    assert_nil response.cookies['remember_token']
    assert_response :success
  end
end

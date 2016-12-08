require 'test_helper'

class MessagesControllerTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    two_new_user
    log_in_as @user
  end

  def test_create_new_message
    post ('/users/'+@friend.id.to_s+'/messages.json'), params: {:message => {:text => 'something'}}
    assert_equal 1, Message.all.count
    assert_equal @user.id, Message.last.user_id
    assert_equal @friend.id, Message.last.receiver_id
    assert_equal 'something', Message.last.text
    assert_equal true, JSON.parse(response.body)['status']
  end

  def test_show_all_received_messages
    Message.create(user_id: @friend.id, receiver_id: @user.id, text: 'something')
    get ('/users/'+@user.id.to_s+'/messages.json')
    assert_response :success
    assert_equal 1, Message.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['messages'].count
    message = data['messages'][0]['message']
    assert_equal Message.last.id, message['id']
    assert_equal @friend.id, message['user_id']
    assert_equal @user.id, message['receiver_id']
    assert_equal 'something', message['text']
    assert_equal @friend.slice(:name, :surname, :id), data['messages'][0]['user']
  end
end

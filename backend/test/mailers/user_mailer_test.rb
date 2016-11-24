require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
    @user.activation_token = User.new_token
  end

  def test_account_activation
    mail = UserMailer.account_activation(@user)
    assert_equal "Account activation", mail.subject
    assert_equal [@user.email], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match @user.name, mail.body.encoded
    assert_match @user.activation_token, mail.body.encoded
    assert_match CGI.escape(@user.email), mail.body.encoded
  end

  def test_password_reset
    mail = UserMailer.password_reset(@user)
    assert_equal "Password reset", mail.subject
    assert_equal [@user.email], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match @user.name, mail.body.encoded
    assert_match CGI.escape(@user.email), mail.body.encoded
    assert_match @user.activation_token, mail.body.encoded
  end

end

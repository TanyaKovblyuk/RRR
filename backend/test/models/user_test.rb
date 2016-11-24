require "test_helper"

class UserTest < ActiveSupport::TestCase
  include UserTestHelper

  def setup
    @user = User.new( valid_user )
  end

  def test_name_validation
    validation user_data[:name] {|value| @user.name = value}
  end

  def test_surname_validation
    validation user_data[:surname] {|value| @user.surname = value}
  end

  def test_gender_validation
    validation user_data[:gender] {|value| @user.gender = value}
  end

  def test_email_validation
    validation user_data[:email] {|value| @user.email = value}
  end

  def test_password_validation
    validation user_data[:pass] do |value|
      @user.password = value
      @user.password_confirmation = value
    end
  end

  def test_create_new_user
    @user = User.create( valid_user )
    assert_not User.all[0].activated
    assert_not_nil User.all[0].activation_digest
  end

  def test_remember_and_forget_user
    @user = User.create( valid_user )
    assert_nil User.all[0].remember_digest
    @user.remember
    assert_not_nil User.all[0].remember_digest
    @user.forget
    assert_nil User.all[0].remember_digest
  end

  def test_authenticated_method
    assert_not @user.authenticated?(:activation, '')
  end

  private
    def validation(hash, &block)
      hash[:invalid].each do |invalid|
        yield invalid
        assert @user.invalid?
      end
      hash[:valid].each do |valid|
        yield valid
        assert @user.valid?
      end
    end

    def user_data
      {:name => {:valid => ["Ben", "Anna-Maria"],
                 :invalid => ["", "_Ben_", "a"*20, "Me@name"]},
       :surname => {:valid => ["Black", "Black-White"],
                    :invalid => ["", "_Black_", "a"*20, "Me@surname"]},
       :gender => {:valid => ["male", "female"],
                   :invalid => ["", "Somethingelse"]},
       :email => {:valid => ["user@foo.COM", "A_US-ER@f.b.org", "frst.lst@foo.jp", "a+b@baz.cn"],
                  :invalid => ["user@foo,com", "user_at_foo.org", "example.user@foo.foo@bar_baz.com"]},
       :pass => {:valid => ["Aaaa1", "1Aaaaa", "a1aaaAA"],
                 :invalid => ["12345", "Aa1", "aaaaa", "aaaaa1", "Aaaaaa"]} }
    end
end

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

module UserTestHelper
  def valid_user
    { name: "Exemple",
      surname: "Exemple",
      gender: "male",
      email: "true_mail@example.com",
      password: "True0pass",
      password_confirmation: "True0pass" }
  end

  def valid_image
    { image: File.open("#{Rails.root}/test/fixtures/files/some.jpg"),
      user_id: @user.id }
  end

  def two_new_user
    @user = User.create(name: "Sad",
                        surname: "Exemple",
                        gender: "male",
                        email: "sad_mail@example.com",
                        password: "True0pass",
                        password_confirmation: "True0pass")
    @friend = User.create(name: "Dark",
                          surname: "Exemple",
                          gender: "male",
                          email: "dark_mail@example.com",
                          password: "True0pass",
                          password_confirmation: "True0pass")
  end

  def log_in_as user
    post '/login.json', params:  {:email => user.email,
                                  :password => valid_user[:password],
                                  :remember_me => '1'}
  end
end

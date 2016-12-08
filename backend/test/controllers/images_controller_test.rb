require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    two_new_user
    log_in_as @user
  end

  def test_create_new_avatar
    base_64 = "data:image/jpg;base64,"+Base64.encode64(open("#{Rails.root}/test/fixtures/files/some.jpg").read)
    post ('/users/'+@user.id.to_s+'/images.json'), params: {:avatar => base_64}
    assert_equal 1, Image.all.count
    assert Image.last.avatar
    assert_response :success
    assert_equal @user.id, Image.last.user_id
    url = "/be/uploads/image/image/"+Image.last.id.to_s+"/avatar_file.jpg"
    assert_equal url, JSON.parse(response.body)['avatar']
  end

  def test_show_all_gallery
    Image.create(valid_image)
    get ('/users/'+@user.id.to_s+'/images.json')
    assert_response :success
    assert_equal 1, Image.all.count
    data = JSON.parse(response.body)
    assert_equal true, data['status']
    assert_equal 1, data['images'].count
    assert_equal ("/be/"+Image.last.image.url), data['images'][0]
  end
end

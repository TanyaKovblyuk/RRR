require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
    @img = Image.new( valid_image )
  end

  def test_presence_user_id
    assert @img.valid?
    @img.user_id = nil
    assert @img.invalid?
  end

  def test_presence_image
    @img = Image.new( user_id: @user.id )
    assert @img.invalid?
  end

  def test_default_avatar_value
    @img = Image.create( valid_image )
    assert_equal false, @img.avatar
  end

  def test_resize
    image = MiniMagick::Image.open(@img.image.thumb.path)
    assert_equal 60, image[:width]
    assert_equal 60, image[:height]
    image = MiniMagick::Image.open(@img.image.list.path)
    assert_equal 200, image[:width]
    assert_equal 300, image[:height]
    image = MiniMagick::Image.open(@img.image.avatar.path)
    assert_equal 200, image[:width]
    assert_equal 250, image[:height]
  end
end

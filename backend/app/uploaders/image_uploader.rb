# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  storage :file

  def default_url(*args)
    'setting.png'
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :avatar do
    process resize_to_fill: [200,250]
  end

  version :list do
    process resize_to_fill: [200,300]
  end

  version :thumb do
    process resize_to_fill: [60,60]
  end

  version :post do
    process resize_to_fill: [490,400, gravity = 'NorthWest']
  end

  def extension_whitelist
    %w(jpg jpeg png)
  end

end

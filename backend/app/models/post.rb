class Post < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :nullify
  has_many :comments, dependent: :destroy
  has_many :ratings, dependent: :destroy

  validates :user, presence: true
  validates :user_id, presence: true
  validates :text, presence: true, if: "images.nil?"
  validates :images, presence: true, if: "text.nil?"
end

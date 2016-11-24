class Message < ApplicationRecord
  belongs_to :user
  belongs_to :receiver, :class_name => "User"
  has_many :images

  validates :text, presence: true
  validates :user_id, presence: true
  validates :user, presence: true
  validates :receiver_id, presence: true
  validates :receiver, presence: true
end

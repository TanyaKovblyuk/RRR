class FriendRelation < ApplicationRecord
  belongs_to :user
  belongs_to :friend, :class_name => "User"

  validates :user_id, presence: true
  validates :user, presence: true
  validates :friend_id, presence: true
  validates :friend, presence: true
end

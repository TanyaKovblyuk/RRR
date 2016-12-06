class AddIndexToFriendRelation < ActiveRecord::Migration[5.0]
  def change
    add_index :friend_relations, [:user_id, :friend_id], unique: true
  end
end

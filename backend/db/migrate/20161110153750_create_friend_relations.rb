class CreateFriendRelations < ActiveRecord::Migration[5.0]
  def change
    create_table :friend_relations do |t|
      t.integer :user_id,           index: true
      t.integer :friend_id,         index: true
      t.boolean :confirmed,         default: false
      t.timestamps
    end
  end
end

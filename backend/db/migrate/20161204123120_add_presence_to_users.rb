class AddPresenceToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :presence, :string
  end
end

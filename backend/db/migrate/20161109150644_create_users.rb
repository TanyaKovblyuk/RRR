class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string   "name"
      t.string   "surname"
      t.string   "gender"
      t.string   "email"
      t.string   "password_digest"
      t.string   "activation_digest"
      t.boolean  "activated",                         default: false
      t.datetime "activated_at"
      t.string   "remember_digest"
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end

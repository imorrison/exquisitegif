class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.integer :animation_id, :null => false
      t.string :email
      t.string :twitter_handle

      t.timestamps
    end

    add_index :invitations, :animation_id
    add_index :invitations, :email
    add_index :invitations, :twitter_handle
  end
end

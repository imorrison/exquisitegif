class CreateAnimations < ActiveRecord::Migration
  def change
    create_table :animations do |t|
      t.integer :owner_id, :null => false
      t.string :title, :null => false

      t.timestamps
    end
    add_index :animations, :owner_id
    add_index :animations, :title
  end
end

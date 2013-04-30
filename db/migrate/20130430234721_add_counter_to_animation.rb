class AddCounterToAnimation < ActiveRecord::Migration
  def self.up
    add_column :animations, :frames_count, :integer
  end

  def self.down
    remove_column :animations, :frames_count
  end
end

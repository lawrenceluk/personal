class AddCreditsRebirths < ActiveRecord::Migration
  def change
  	add_column :saves, :rebirths, :integer, default: 0
  	add_column :saves, :credits, :integer, default: 0
  end
end

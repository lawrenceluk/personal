class CreateSaves < ActiveRecord::Migration
  def change
    create_table :saves do |t|
			t.string :username
			t.string :hiddenname
			t.string :identifier
      t.text :data
      t.timestamps
    end
  end
end

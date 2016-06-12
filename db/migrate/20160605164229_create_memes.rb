class CreateMemes < ActiveRecord::Migration
  def change
    create_table :memes do |t|
      t.string :name
      t.text :url

      t.timestamps null: false
    end
  end
end

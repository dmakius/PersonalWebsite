class CreateSketches < ActiveRecord::Migration
  def change
    create_table :sketches do |t|
      t.string :title
      t.string :url
      t.text :about

      t.timestamps null: false
    end
  end
end

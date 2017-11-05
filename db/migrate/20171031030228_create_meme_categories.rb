class CreateMemeCategories < ActiveRecord::Migration
  def change
    create_table :meme_categories do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end

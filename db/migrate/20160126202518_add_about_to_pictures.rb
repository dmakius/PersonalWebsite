class AddAboutToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :about, :text
  end
end

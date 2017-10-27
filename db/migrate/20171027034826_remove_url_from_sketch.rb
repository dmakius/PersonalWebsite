class RemoveUrlFromSketch < ActiveRecord::Migration
  def change
  	remove_column :sketches, :url, :string
  end
end

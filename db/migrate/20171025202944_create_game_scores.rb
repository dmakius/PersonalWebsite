class CreateGameScores < ActiveRecord::Migration
  def change
    create_table :game_scores do |t|
      t.string :game
      t.string :username
      t.integer :score

      t.timestamps null: false
    end
  end
end

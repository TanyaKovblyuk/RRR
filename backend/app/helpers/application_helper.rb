module ApplicationHelper
  def like model
    model.ratings.where('CAST("like" AS text) LIKE ?', '1').count
  end

  def dislike model
    model.ratings.where('CAST("dislike" AS text) LIKE ?', '1').count
  end
end

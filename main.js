function renderResult(result) {
  console.log(result);

  let fragment = document.createDocumentFragment();
  result.forEach(function(item) {
    item = item.data;

    let container = document.createElement('div');
    let img = document.createElement('img');
    let resultContent = document.createElement('div');
    let resultTitle = document.createElement('div');
    let title = document.createElement('a');
    let author = document.createElement('div');
    let score = document.createElement('div');
    let resultOverlay = document.createElement('div');

    container.classList.add('result');
    resultContent.classList.add('resultContent');
    resultTitle.classList.add('resultTitle');
    author.classList.add('author');
    score.classList.add('resultScore');

    var imagePattern = new RegExp('.*\.(jpg|jpeg|png)');
    if(imagePattern.test(item.url)) {
      img.src = item.url;
      img.alt = item.title;
      resultOverlay.classList.add('resultOverlay');
    }
    else {
      resultOverlay.classList.add('fullOverlay');
    }

    if(item.title.length > 35) {
      item.title = item.title.substring(0, 35) + '...';
    }

    title.innerText = item.title;
    title.href = 'https://www.reddit.com' + item.permalink;
    score.innerText = 'Score: ' + item.score;
    author.innerText = 'By ' + item.author;

    resultTitle.append(title);
    resultContent.append(resultTitle);
    resultContent.append(author);
    container.append(img);
    container.append(resultContent);
    container.append(score);
    container.append(resultOverlay);
    fragment.append(container);
  });

  $('.loader').css('display', 'none');
  $('#results').html(fragment);
}

$(document).ready(function() {
  $('#redditForm').submit(function() {
    $('#error').css('display', 'none');
    $('.loader').css('display', 'block');
    let subreddit = $(this).find('input[name="subreddit"]').val();

    $.ajax({
      method: 'GET',
      url: 'https://www.reddit.com/r/' + subreddit + '.json'
    }).then(function(result) {
      console.log(result)
      renderResult(result.data.children);
    }).fail(function() {
      $('#error').css('display', 'block');
      $('.loader').css('display', 'none');
    });

    return false;
  });
});

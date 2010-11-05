var hashtag = "votetag";
var oauth_consumer_key = "@consumerkey";
var oauth_consumer_secret = "@consumersecret";
var oauth_token = "@authtoken";
var oauth_token_secret = "@authtokensecret";

function get_votes(candidate)
{
    var candidateID = candidate.id;
    $.getJSON("http://search.twitter.com/search.json?lang=all&q=%23" + hashtag + "-" + candidateID + "-u&callback=?", function(data){ $("#up-" + candidateID).text(data.results.length); });
    $.getJSON("http://search.twitter.com/search.json?lang=all&q=%23" + hashtag + "-" + candidateID + "-d&callback=?", function(data){ $("#down-" + candidateID).text(data.results.length); });
    $("#spin-" + candidateID).hide();
}

function vote(vote, suffix)
{
    $("#spin-" + vote.id).show();
    var status = "%23" + hashtag + "-" + vote.id + "-" + suffix + "%20" + Math.floor((new Date()).getTime() / 1000);
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=INSERT%20INTO%20twitter.status%20(status,%20oauth_consumer_key,%20oauth_consumer_secret,%20oauth_token,%20oauth_token_secret)%20VALUES%20('" + status + "',%20'" + oauth_consumer_key + "',%20'" + oauth_consumer_secret + "',%20'" + oauth_token + "',%20'" + oauth_token_secret + "')&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?", function(data){ setTimeout("get_votes(" + vote.id + ")", 15000); });
}

function init_votes() {
    $('div').each(function() {
        var myID = this.id;
        $(this).html('<b>' + myID + ':</b> <span id="up-'+ myID + '"></span> <span style="color: green" onclick="vote(' + myID + ', \'u\')">up</span>, <span id="down-' + myID + '"></span> <span style="color: red" onclick="vote(' + myID + ', \'d\')">down</span><span id="spin-' + myID + '" style="margin-left: 5px"><img src="img/spin.gif" /></span>');
        get_votes(this);
    });
}
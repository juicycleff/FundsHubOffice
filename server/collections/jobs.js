
rematchJobs.allow({
    // Grant full permission to any authenticated user
    admin: function (userId, method, params) {
      return (userId ? true : false);
    }
});

matchJobs.allow({
    // Grant full permission to any authenticated user
    admin: function (userId, method, params) {
      return (userId ? true : false);
    }
});


Meteor.startup(function() {
  Meteor.publish('allJobs', function () {
      return rematchJobs.find({});
      return matchJobs.find({});
 });

    // Start the myJobs queue running
    return rematchJobs.startJobServer();
    return matchJobs.startJobServer();

});
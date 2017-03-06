var myJobs = JobCollection('myGhQueue');
  myJobs.allow({
    // Grant full permission to any authenticated user
    admin: function (userId, method, params) {
      return (userId ? true : false);
    }
});


Meteor.startup(function() {
  Meteor.publish('allJobs', function () {
      return myJobs.find({});
 });

    // Start the myJobs queue running
    return myJobs.startJobServer();

});
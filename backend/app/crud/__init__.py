class ObjectNotFoundException(Exception):
    # Exception used when an object does not exist in the db.
    pass


class MultipleInstancesFoundException(Exception):
    # Exception used when multiple instances of an object are found in the db.
    pass


class AlreadyExistsException(Exception):
    # Exception used when an object already exists in the db.
    pass

'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        len: {
          args: [2, 100],
          msg: 'Name must be between 2 and 100 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'users_email_unique',
        msg: 'This email is already registered'
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address'
        },
        notNull: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: 'Password must be 8-100 characters'
        },
        isStrongEnough(value) {
          if (!/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[^A-Za-z0-9]/.test(value)) {
            throw new Error('Password must contain at least one uppercase letter, one number, and one special character');
          }
        }
      }
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1900],
          msg: 'Graduation year must be after 1900'
        },
        max: {
          args: [new Date().getFullYear() + 5],
          msg: 'Graduation year cannot be more than 5 years in the future'
        }
      }
    },
    degree: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 100],
          msg: 'Degree must be 2-100 characters'
        }
      }
    },
    currentJob: DataTypes.STRING,
    profilePicture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Profile picture must be a valid URL',
          protocols: ['http', 'https'],
          require_protocol: true
        }
      }
    },
    bio: DataTypes.TEXT,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastLoginAt: DataTypes.DATE,
    passwordChangedAt: DataTypes.DATE
  }, {
    tableName: 'Users', // ✅ Critical for MySQL table name casing
    timestamps: true,
    paranoid: true, // Enables soft deletes
    defaultScope: {
      attributes: {
        exclude: ['password', 'isAdmin', 'passwordChangedAt']
      }
    },
    scopes: {
      withSensitive: {
        attributes: { include: ['password', 'isAdmin'] }
      },
      forAuth: {
        attributes: ['id', 'email', 'password', 'isVerified', 'isAdmin']
      }
    },
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
          user.passwordChangedAt = new Date();
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 12);
          user.passwordChangedAt = new Date();
        }
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['graduationYear']
      }
    ]
  });

  // Instance method to compare password
  User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  // Check if password was changed after JWT was issued
  User.prototype.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  };

  // Custom class method for finding by email
  User.findByEmail = async function(email) {
    return await this.scope('forAuth').findOne({ where: { email } });
  };

  return User;
};


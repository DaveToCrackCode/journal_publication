// JournalCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../style/journalcard.css';

const JournalCard = ({journal}) => {
const { id, title, author, status, date,journalType } = journal;
console.log(journal);

  return (
    <div className="journal-card">
      <h3>Title: Cancer Detection </h3>
      <p>Author: {author.name}</p>
      <p>Status: {status}</p>
      <p>Date: {date}</p>
      <p>Subject Category:{journalType}</p>
      <Link to={`/journal/${journal._id}`} className="detail-button">
        Check More Details / Add Reviewers
      </Link>
    </div>
  );
};

export default JournalCard;

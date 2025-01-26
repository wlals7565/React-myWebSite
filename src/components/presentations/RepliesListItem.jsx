import PropTypes from 'prop-types'
import React from 'react'
import { UserLink } from '../StyledComponents';
import styled from 'styled-components';
import ReplyRecommendationContainer from '../containers/ReplyRecommendationContainer';

const ReplyItemBox = styled.li`
  display: flex;
`;

const RepliesListItem = ({reply}) => {
  return (
    <ReplyItemBox>
      <ReplyRecommendationContainer initialState={reply.recommendations} commentId={reply.id} />
      <div>
        <div>{reply.body}</div>
        <div>
          - Commented by <UserLink>{reply.author?.name}</UserLink>
        </div>
      </div>
    </ReplyItemBox>
  );
}

RepliesListItem.propTypes = {
  reply: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    deletedAt: PropTypes.string,
    recommendations: PropTypes.array.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  })
}

export default RepliesListItem

/*
{
					"id": "349de161-9721-4e95-8b5b-9221d3fecc0e",
					"body": "testReplyforTestAnswer",
					"createdAt": "2025-01-26T04:10:08.770Z",
					"updatedAt": "2025-01-26T04:10:08.770Z",
					"deletedAt": null,
					"author": {
						"id": "274027bb-6142-42d6-b6ad-676f3e727670",
						"name": "testtest",
						"email": "test1212@naver.com"
					},
					"recommendation": [
						{
							"id": "889ea891-ad64-42cc-b782-f6d7f12f6320"
						}
					]
				}
*/
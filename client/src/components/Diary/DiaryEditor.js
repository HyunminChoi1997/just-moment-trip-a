import React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 480px;
  padding: 0 8px;
  border: 10px solid rgb(214, 216, 218);
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #efefef;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: green;
      :hover {
        transition: all 0.2s linear;
        transform: scale(1.05);
      }
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: red;
        border-radius: 50%;
        background: #efefef;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within {
    border: 5px solid palegreen;
  }
`;

function DiaryEditor({
  onRemove,
  onEdit,
  id,
  location,
  content,
  writeDate,
  hashtags,
}) {
  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
  });

  const localContentInput = useRef();
  const localLocationInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [localLocation, setLocalLocation] = useState(location);
  const [LocalHasttags, setLocalHashtags] = useState(hashtags);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleClickRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
      console.log('check ID :', id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalLocation(location);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localLocation.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent, localLocation);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryEditor">
      <div className="info">
        {isEdit ? (
          <>
            <div className="location_edit">
              <input
                className="location_info"
                ref={localLocationInput}
                value={localLocation}
                onChange={e => setLocalLocation(e.target.value)}
              />
            </div>
            <div className="content_edit">
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={e => setLocalContent(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="location">{location}</div>
            <div className="content">{content}</div>
            <div className="hashtags">
              <TagsInput>
                <ul id="tags">
                  {LocalHasttags.map((tag, index) => (
                    <li key={index} className="tag">
                      <span
                        className="tag-title"
                        onClick={() => {
                          console.log('AXIOS넣기');
                        }}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </TagsInput>
            </div>
          </>
        )}

        <br />
        <span className="date">작성 시간 :{writeDate}</span>
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleClickRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
}
export default memo(DiaryEditor);

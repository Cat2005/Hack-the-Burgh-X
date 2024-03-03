import Comment from '@/components/Comment'
import DocumentView from '@/components/DocumentView'
import HorizontalHeader from '@/components/HorizontalHeader'
import SearchResult from '@/components/SearchResult'
import TagView from '@/components/TagView';
import Tag from '@/components/Tags'
import { Comme } from 'next/font/google'
import React from 'react'

export default function Home() {
  return (
    <>
      <SearchResult
        image="https://i.imgur.com/TZ1dtD7.png"
        docName="docName.pdf"
        snippet={[
          <>
            Cupidatat laborum esse id nisi dolore commodo cupidatat. Eiusmod est
            cillum ea ipsum duis ea sit Aliqua consequat enim ipsum eiusmod ut
            in consequat amet officia. Pariatur nisi magna aliquip eu ex velit
            ipsum cillum labore ullamco. Sit ea ea laborum dolor.
          </>,
          <>
            Cupidatat laborum esse id nisi dolore commodo cupidatat. Eiusmod est
            cillum ea ipsum duis ea{' '}
            <span className="bg-[#fff200] red-500">
              sit sit. Duis proident anim nostrud. Minim aliqua minim ullamco
              enim exercitation sit pariatur
            </span>{' '}
            officia. Pariatur nisi magna aliquip eu ex velit ipsum cillum labore
            ullamco. Sit ea ea laborum dolor.
          </>,
        ]}
      />
      <Tag text={['N-Gram', 'Some tag', 'tag3']} />

      <DocumentView
        documentName="docName.pdf"
        documentTags={['N-Gram', 'Some tag', 'tag3']}
        documentUrl="https://docs.rs-online.com/d636/A700000008880675.pdf"
        comments={[
          { title: 'Comment 1', content: 'This is a comment' },
          { title: 'Comment 2', content: 'This is another comment' },
        ]}
      />
      <TagView tagName='Sorting'/>
    </>
  )
}

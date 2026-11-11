import Classroom from './classroom';
import {lessons, works, standardTexts, learningNotes} from './curriculum';
export default function Home() { return <Classroom lessons={lessons} works={works} standardTexts={standardTexts} learningNotes={learningNotes}/>; }



type MistakesProps = {
    count: number;
}

const Mistakes = ({count}: MistakesProps) => {
    const mistakes = Array.from({length: count}, () => '');

    return (
        <div className='game__mistakes'>
            {
                mistakes.map((_item, i) => {
                    const keyValue = `mistake-${i}`;

                    return <div key={keyValue} className='wrong'/>
                })
            }
        </div>
    );
}

export default Mistakes;
import React from 'react';

class CpuPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processes: [
                {
                    name: 'test',
                    pid: 12345
                }
            ]
        };
    }

    render() {
        var processes = this.state.processes;

        var processList = processes.map(function (process) {
            return <div>{process.name}</div>;
        })

        return (
            <div>
                <div>Cpu Page</div>
                {processList}
            </div>
        );
    }

}

export default CpuPage;
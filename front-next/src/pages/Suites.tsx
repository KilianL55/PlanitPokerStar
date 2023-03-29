import {useEffect, useState} from "react";
import getSuites from "@/pages/api/suite";
import '/styles/Suites.module.css'

export default function Suites() {
    const [suite, SetSuite] = useState<any>([]);

    useEffect(() => {
        getSuites().then((data) => SetSuite(data));
    }, []);

    return (
        <>
            <div >
                <h1>Suites</h1>
                {suite.map((suite: any) => (
                    <ul key={suite.id}>
                        <li>{suite.name}</li>
                        <li>{suite.suitevalues}</li>
                    </ul>
                ))}
            </div>
        </>
    );

}
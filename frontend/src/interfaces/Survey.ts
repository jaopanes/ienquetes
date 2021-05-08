export default interface SurveyInterface {
    future: [
        {
            id: number,
            title: string,
            initiated_at: string,
            ended_at: string,
        }
    ],
    ended: [
        {
            id: number,
            title: string,
            initiated_at: string,
            ended_at: string,
        }
    ],
    active: [
        {
            id: number,
            title: string,
            initiated_at: string,
            ended_at: string,
        }
    ]
}